import CircularProgress from '@mui/material/CircularProgress';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import * as React from 'react';

type BaseVerticalStepperProps = {
  activeStep: number;
  steps: {
    label: string;
  }[];
};

const SmallCircularProgress = () => {
  return <CircularProgress size="1.3rem" />;
};

const BaseVerticalStepper: React.FC<BaseVerticalStepperProps> = (props) => {
  const { activeStep, steps } = props;
  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => {
        if (index === activeStep) {
          return (
            <Step key={step.label}>
              <StepLabel StepIconComponent={SmallCircularProgress}>
                {step.label}
              </StepLabel>
            </Step>
          );
        } else {
          return (
            <Step key={step.label}>
              <StepLabel> {step.label}</StepLabel>
            </Step>
          );
        }
      })}
    </Stepper>
  );
};

export default BaseVerticalStepper;
