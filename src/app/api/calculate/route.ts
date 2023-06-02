import { NextRequest, NextResponse } from 'next/server';

const seasons = ['summer', 'autumn', 'winter', 'spring'];
const getSeason = (d: Date) => seasons[Math.floor((d.getMonth() / 12) * 4) % 4];

export async function POST(req: NextRequest) {
  const {
    load,
    pvPanalArea,
    pvCostPerPanel,
    controllerCost,
    converterCost,
    batteryCost,
    gridCostKWH,
    solarIrradiance,
    pvEff,
  } = await req.json();

  const season = getSeason(new Date());
  const PSH = season === 'summer' ? 11 : season === 'winter' ? 8 : 9;

  const totalCost: any = [];

  const calculate = (gridPercent: number, pvPercent: number) => {
    const gridLoad = gridPercent * load;
    const pvLoad = (pvPercent * load) / PSH;

    const pvEnergym2 = solarIrradiance * pvEff;
    const totalPvArea = pvLoad / pvEnergym2;

    const pvPanelCount = Math.ceil(totalPvArea / pvPanalArea);

    const gridCost = gridLoad * gridCostKWH * 365 * 20;

    const pvCost = pvPercent
      ? pvPanelCount * pvCostPerPanel +
        controllerCost +
        converterCost +
        batteryCost
      : 0;

    const pvMaintinance = pvCost * 0.01 * 20;

    const LCOE =
      (pvCost + pvMaintinance + gridCost * 20) / (pvLoad * 20 + gridLoad * 20);

    totalCost.push({
      gridPercent: `${gridPercent * 100}%`,
      pvPercent: `${pvPercent * 100}%`,
      gridCost,
      pvCost: pvCost + pvMaintinance,
      totalCost: gridCost + pvCost + pvMaintinance,
      LCOE,
      totalPvArea: totalPvArea || 0,
      pvPanelCount: pvPanelCount || 0,
    });
  };

  for (let i = 0; i <= 100; i += 10) {
    calculate((100 - i) / 100, i / 100);
  }

  return NextResponse.json(totalCost);
}
