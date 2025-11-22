import { createContext, useContext, useState, ReactNode } from 'react';

export interface Step1Data {
  title: string;
  description: string;
  projectTitle: string;
  type: string;
  dominant_core: string;
  mode: string;
  location: string;
}

export interface Step2Data {
  reward: {
    currency: string;
    amount: number;
    winners: number;
  };
  timeline: {
    expiration_date: string;
    estimated_completion: {
      days: number;
      hours: number;
      minutes: number;
    };
  };
  hasImpactCertificate: boolean;
  impactBriefMessage: string;
  sdgs: string[];
  failureThreshold: number;
}

export interface Step3Data {
  has_backer: boolean;
  backer: {
    name: string;
    logo: string;
    message: string;
  };
  terms_accepted: boolean;
}

interface FormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
}

interface FormContextType {
  formData: FormData;
  updateStep1: (data: Partial<Step1Data>) => void;
  updateStep2: (data: Partial<Step2Data>) => void;
  updateStep3: (data: Partial<Step3Data>) => void;
  resetForm: () => void;
}

export const initialFormData: FormData = {
  step1: {
    title: '',
    description: '',
    projectTitle: '',
    type: '',
    dominant_core: '',
    mode: 'digital',
    location: '',
  },
  step2: {
    reward: {
      currency: 'USD',
      amount: 0,
      winners: 1,
    },
    timeline: {
      expiration_date: '',
      estimated_completion: {
        days: 0,
        hours: 0,
        minutes: 0,
      },
    },
    hasImpactCertificate: false,
    impactBriefMessage: '',
    sdgs: [],
    failureThreshold: 5,
  },
  step3: {
    has_backer: false,
    backer: {
      name: '',
      logo: '',
      message: '',
    },
    terms_accepted: false,
  },
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateStep1 = (data: Partial<Step1Data>) => {
    setFormData((prev) => ({
      ...prev,
      step1: { ...prev.step1, ...data },
    }));
  };

  const updateStep2 = (data: Partial<Step2Data>) => {
    setFormData((prev) => ({
      ...prev,
      step2: { ...prev.step2, ...data },
    }));
  };

  const updateStep3 = (data: Partial<Step3Data>) => {
    setFormData((prev) => ({
      ...prev,
      step3: { ...prev.step3, ...data },
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <FormContext.Provider value={{ formData, updateStep1, updateStep2, updateStep3, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};