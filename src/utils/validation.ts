import { Step1Data, Step2Data, Step3Data } from '@/context/FormContext';

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateStep1 = (data: Step1Data): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim() === '') {
    errors.title = 'Title is required';
  } else if (data.title.length > 40) {
    errors.title = 'Title must be 40 characters or less';
  }

  if (!data.description || data.description.trim() === '') {
    errors.description = 'Description is required';
  }

  if (!data.type) {
    errors.type = 'Type is required';
  }

  if (!data.dominant_core) {
    errors.dominant_core = 'Dominant core is required';
  }

  if (!data.mode) {
    errors.mode = 'Mode is required';
  }

  if (data.mode === 'physical' && (!data.location || data.location.trim() === '')) {
    errors.location = 'Location is required for physical mode';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateStep2 = (data: Step2Data): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.reward?.currency) {
    errors.currency = 'Currency is required';
  }

  if (!data.reward?.amount || data.reward.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }

  if (!data.reward?.winners || data.reward.winners < 1) {
    errors.winners = 'Winners must be at least 1';
  }

  if (!data.failureThreshold || data.failureThreshold < 1) {
    errors.failureThreshold = 'Failure threshold must be at least 1';
  }

  if (data.hasImpactCertificate && (!data.impactBriefMessage || data.impactBriefMessage.trim() === '')) {
    errors.impactBriefMessage = 'Impact brief message is required when impact certificate is enabled';
  }

  if (!data.sdgs || data.sdgs.length === 0) {
    errors.sdgs = 'At least one SDG must be selected';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateStep3 = (data: Step3Data): ValidationResult => {
  const errors: Record<string, string> = {};

  if (data.has_backer) {
    if (!data.backer?.name || data.backer.name.trim() === '') {
      errors.backer_name = 'Backer name is required';
    }
  }

  if (!data.terms_accepted) {
    errors.terms_accepted = 'You must accept the terms and conditions';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};