import z from 'zod';
import { createContext, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormStep, MultiStepFormContextProps } from "../types/index"
import { zodResolver } from '@hookform/resolvers/zod';
import PrevButton from './prev-button';
import ProgressIndicator from './progress-indicator';

export const MultiStepFormContext = createContext<MultiStepFormContextProps | null>(null);

export default function MultiStepForm({
  steps,
  defaultValues,
  zodFormSchema
}: {
  steps: FormStep[],
  defaultValues: any
  zodFormSchema: any
}) {
  type ZodFormSchemaType = z.infer<typeof zodFormSchema>
  const methods = useForm<ZodFormSchemaType>({
    resolver: zodResolver(zodFormSchema),
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (position: number) => {
    if (position >= 0 && position - 1 < steps.length) {
      setCurrentStepIndex(position - 1)
      // saveFormState(position - 1)
    }
  }

  async function submitSteppedForm(data: ZodFormSchemaType) {
  }

  // Context value
  const value: MultiStepFormContextProps = {
    currentStep: steps[currentStepIndex],
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goToStep,
    nextStep,
    previousStep,
    steps,
  };

  return (
    <MultiStepFormContext.Provider value={value} >
      <FormProvider {...methods} >
        <div className="w-[550px] mx-auto" >
          <ProgressIndicator />
          <form onSubmit={methods.handleSubmit(submitSteppedForm)} >
            <h1 className="py-5 text-3xl font-bold" > {currentStep.title} </h1>
            {currentStep.component}
            <PrevButton />
          </form>
        </div>
      </FormProvider>
    </MultiStepFormContext.Provider>
  );
};