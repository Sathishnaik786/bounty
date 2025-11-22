export const generatePayload = (formData: any) => {
  return {
    title: formData.step1.title,
    description: formData.step1.description,
    projectTitle: formData.step1.projectTitle || formData.step1.title,
    type: formData.step1.type,
    dominant_core: formData.step1.dominant_core,
    mode: formData.step1.mode,
    location: formData.step1.location,
    reward: {
      currency: formData.step2.reward.currency,
      amount: formData.step2.reward.amount,
      winners: formData.step2.reward.winners,
    },
    timeline: {
      expiration_date: formData.step2.timeline.expiration_date,
      estimated_completion: {
        days: formData.step2.timeline.estimated_completion.days,
        hours: formData.step2.timeline.estimated_completion.hours,
        minutes: formData.step2.timeline.estimated_completion.minutes,
      },
    },
    sdgs: formData.step2.sdgs,
    hasImpactCertificate: formData.step2.hasImpactCertificate,
    impactBriefMessage: formData.step2.impactBriefMessage,
    has_backer: formData.step3.has_backer,
    backer: formData.step3.has_backer
      ? {
          name: formData.step3.backer.name,
          logo: formData.step3.backer.logo,
          message: formData.step3.backer.message,
        }
      : {
          name: '',
          logo: '',
          message: '',
        },
    terms_accepted: formData.step3.terms_accepted,
  };
};
