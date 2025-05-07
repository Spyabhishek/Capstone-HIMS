class Policy {
  constructor({
    id,
    policyNumber,
    policyType,
    customerId,
    startDate,
    endDate,
    premiumAmount,
    coverageAmount,
    status,
    description,
    termsAndConditions,
    createdAt,
    updatedAt
  } = {}) {
    this.id = id;
    this.policyNumber = policyNumber;
    this.policyType = policyType;
    this.customerId = customerId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.premiumAmount = premiumAmount;
    this.coverageAmount = coverageAmount;
    this.status = status;
    this.description = description;
    this.termsAndConditions = termsAndConditions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Policy; 