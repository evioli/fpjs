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


function calcTipAndTotal(billAmount, tipPercent) {
  const bill = parseFloat(billAmount);
  const tip = bill * parseFloat(tipPercent) / 100 || 0;
  return [tip, bill + tip];
}

function update (msg, model) {
  switch(msg.type) {
    case MSGS.AMOUNT: {
      const { billAmount } = msg;
      const [tipAmount, total] = calcTipAndTotal(billAmount, model.tipPercent);

      return { ...model, billAmount, tipAmount, total }
    }
    case MSGS.TIP: {
      const { tipPercent } = msg;
      const [tipAmount, total] = calcTipAndTotal(model.billAmount, tipPercent);

      return { ...model, tipPercent, tipAmount, total }
    }
  }
  return model;
}

export default update;
