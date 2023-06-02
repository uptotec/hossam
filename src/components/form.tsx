'use client';

import { useFormik } from 'formik';
import React from 'react';
import FormInput from './formItem';

type FormProps = {
  onSubmit: (...args: any) => any;
};

export type formDataType = {
  load: number;
  pvPanalArea: number;
  pvCostPerPanel: number;
  controllerCost: number;
  converterCost: number;
  batteryCost: number;
  gridCostKWH: number;
  solarIrradiance: number;
  pvEff: number;
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const { values, errors, handleSubmit, handleChange, touched } =
    useFormik<formDataType>({
      initialValues: {
        load: 53,
        pvPanalArea: 1.7,
        pvCostPerPanel: 1000,
        controllerCost: 600,
        converterCost: 3000,
        batteryCost: 4000,
        gridCostKWH: 0.82,
        solarIrradiance: 5.7,
        pvEff: 0.2,
      },
      onSubmit: onSubmit,
    });

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 px-4">
        <FormInput
          placeHolder="Load (kWh)"
          name="load"
          onChange={handleChange}
          value={values.load}
          error={errors.load}
          touched={touched.load}
        />
        <FormInput
          placeHolder="PV Panal Area (m²)"
          name="pvPanalArea"
          onChange={handleChange}
          value={values.pvPanalArea}
          error={errors.pvPanalArea}
          touched={touched.pvPanalArea}
        />
        <FormInput
          placeHolder="PV Cost Per Panel (EGP)"
          name="pvCostPerPanel"
          onChange={handleChange}
          value={values.pvCostPerPanel}
          error={errors.pvCostPerPanel}
          touched={touched.pvCostPerPanel}
        />
        <FormInput
          placeHolder="Controller Cost (EGP)"
          name="controllerCost"
          onChange={handleChange}
          value={values.controllerCost}
          error={errors.controllerCost}
          touched={touched.controllerCost}
        />
        <FormInput
          placeHolder="Converter Cost (EGP)"
          name="converterCost"
          onChange={handleChange}
          value={values.converterCost}
          error={errors.converterCost}
          touched={touched.converterCost}
        />
        <FormInput
          placeHolder="Battery Cost (EGP)"
          name="batteryCost"
          onChange={handleChange}
          value={values.batteryCost}
          error={errors.batteryCost}
          touched={touched.batteryCost}
        />
        <FormInput
          placeHolder="Grid Cost (kWh)"
          name="gridCostKWH"
          onChange={handleChange}
          value={values.gridCostKWH}
          error={errors.gridCostKWH}
          touched={touched.gridCostKWH}
        />
        <FormInput
          placeHolder="Solar Irradiance (kWh/m²/day)"
          name="solarIrradiance"
          onChange={handleChange}
          value={values.solarIrradiance}
          error={errors.solarIrradiance}
          touched={touched.solarIrradiance}
        />
        <FormInput
          placeHolder="PV Efficiency (%)"
          name="pvEff"
          onChange={handleChange}
          value={values.pvEff}
          error={errors.pvEff}
          touched={touched.pvEff}
        />
        <button className="bg-[#208977] mx-4 py-2 text-white rounded-md hover:bg-[#43C59E] transition">
          Calculate
        </button>
      </form>
    </div>
  );
};

export default Form;
