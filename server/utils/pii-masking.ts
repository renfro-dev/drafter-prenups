import type { InsertIntake, PIIMap } from "@shared/schema";
import { randomUUID } from "crypto";

export interface MaskedResult {
  maskedData: any;
  piiMap: PIIMap;
}

export function maskPII(intake: InsertIntake): MaskedResult {
  const piiMap: PIIMap = {
    names: {},
    values: {},
    descriptions: {},
    dates: {},
  };

  const tokenA = `PARTY_A_${randomUUID().substring(0, 8).toUpperCase()}`;
  const tokenB = `PARTY_B_${randomUUID().substring(0, 8).toUpperCase()}`;
  
  piiMap.names[tokenA] = intake.partyAName;
  piiMap.names[tokenB] = intake.partyBName;

  const maskedWeddingDate = `DATE_${randomUUID().substring(0, 8).toUpperCase()}`;
  piiMap.dates[maskedWeddingDate] = intake.weddingDate;

  const emailToken = `EMAIL_${randomUUID().substring(0, 8).toUpperCase()}`;
  piiMap.descriptions[emailToken] = intake.email;

  const maskedAssets = intake.assets.map((asset, idx) => {
    const valueToken = `VALUE_${randomUUID().substring(0, 8).toUpperCase()}`;
    const descToken = `DESC_${randomUUID().substring(0, 8).toUpperCase()}`;
    
    piiMap.values[valueToken] = asset.value;
    piiMap.descriptions[descToken] = asset.description;

    return {
      type: asset.type,
      description: descToken,
      value: valueToken,
      owner: asset.owner,
    };
  });

  const maskedDebts = intake.debts.map((debt, idx) => {
    const valueToken = `VALUE_${randomUUID().substring(0, 8).toUpperCase()}`;
    const descToken = `DESC_${randomUUID().substring(0, 8).toUpperCase()}`;
    
    piiMap.values[valueToken] = debt.value;
    piiMap.descriptions[descToken] = debt.description;

    return {
      type: debt.type,
      description: descToken,
      value: valueToken,
      party: debt.party,
    };
  });

  let maskedAdditionalProvisions = "";
  if (intake.additionalProvisions) {
    const addlToken = `ADDITIONAL_${randomUUID().substring(0, 8).toUpperCase()}`;
    piiMap.descriptions[addlToken] = intake.additionalProvisions;
    maskedAdditionalProvisions = addlToken;
  }

  const maskedData = {
    partyAName: tokenA,
    partyBName: tokenB,
    weddingDate: maskedWeddingDate,
    email: emailToken,
    state: intake.state,
    assets: maskedAssets,
    debts: maskedDebts,
    spousalSupportWaived: intake.spousalSupportWaived,
    separatePropertyProtection: intake.separatePropertyProtection,
    counselRepresented: intake.counselRepresented,
    additionalProvisions: maskedAdditionalProvisions,
  };

  return { maskedData, piiMap };
}

export function unmaskText(text: string, piiMap: PIIMap): string {
  let unmasked = text;

  Object.entries(piiMap.names).forEach(([token, value]) => {
    const regex = new RegExp(token, 'g');
    unmasked = unmasked.replace(regex, value);
  });

  Object.entries(piiMap.descriptions).forEach(([token, value]) => {
    const regex = new RegExp(token, 'g');
    unmasked = unmasked.replace(regex, value);
  });

  Object.entries(piiMap.values).forEach(([token, value]) => {
    const regex = new RegExp(token, 'g');
    unmasked = unmasked.replace(regex, `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  });

  Object.entries(piiMap.dates).forEach(([token, value]) => {
    const regex = new RegExp(token, 'g');
    unmasked = unmasked.replace(regex, value);
  });

  return unmasked;
}
