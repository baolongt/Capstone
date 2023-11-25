import { SxProps } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import * as React from 'react';

type BaseVerticalStepperProps = {
  activeStep: number;
  steps: {
    label: string;
  }[];
  sx?: SxProps;
};

const BaseStepper: React.FC<BaseVerticalStepperProps> = (props) => {
  const { activeStep, steps, sx } = props;
  return (
    <Stepper alternativeLabel sx={sx} activeStep={activeStep}>
      {steps.map((step, index) => {
        if (index === activeStep) {
          return (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
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

export default BaseStepper;
