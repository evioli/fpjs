import * as R from 'ramda';

const MSGS = {
  AMOUNT: 'AMOUNT',
  TIP: 'TIP',
}

export function updateAmount(billAmount) {
  return {
    type: MSGS.AMOUNT,
    billAmount,
  };
}

export function updateTip(tipPercent) {
  return {
    type: MSGS.TIP,
    tipPercent,
  };
}

function update (msg, model) {
  switch(msg.type) {
    case MSGS.AMOUNT: {
      const { billAmount } = msg;
      const parsedBillAmount = parseFloat(billAmount);
      const tipAmount = round(parsedBillAmount) * (round(parseFloat(model.tipPercent)) / 100);
      const total = round(parsedBillAmount + tipAmount);
      return { ...model, billAmount: parsedBillAmount, tipAmount, total }
    }
    case MSGS.TIP: {
      const { tipPercent } = msg;
      const parsedTipPercent = parseFloat(tipPercent);
      const tipAmount = round(parseFloat(model.billAmount)) * (round(parsedTipPercent) / 100);
      const total = round(parseFloat(model.billAmount) + tipAmount);
      return { ...model, tipPercent: parsedTipPercent, tipAmount, total }
    }
  }
  return model;
}

function round(number) {
  return Math.round(number * 10) / 10;
}

export default update;
