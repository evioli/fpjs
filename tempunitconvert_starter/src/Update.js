import * as R from 'ramda';

const MSGS = {
  LEFT_VALUE: 'LEFT_VALUE',
  RIGHT_VALUE: 'RIGHT_VALUE',
  LEFT_UNIT: 'LEFT_UNIT',
  RIGHT_UNIT: 'RIGHT_UNIT',
}

export function updateLeftValueMsg(leftValue) {
  return {
    type: MSGS.LEFT_VALUE,
    leftValue,
  };
}

export function updateRightValueMsg(rightValue) {
  return {
    type: MSGS.RIGHT_VALUE,
    rightValue,
  };
}

export function updateLeftUnitMsg(leftUnit) {
  return {
    type: MSGS.LEFT_UNIT,
    leftUnit,
  };
}

export function updateRightUnitMsg(rightUnit) {
  return {
    type: MSGS.RIGHT_UNIT,
    rightUnit,
  };
}

function update (msg, model) {
  switch(msg.type){
    case MSGS.LEFT_VALUE: {
      if(msg.leftValue === '')
        return { ...model, sourceLeft: true, leftValue: '', rightValue: '' };
      const leftValue = toInt(msg.leftValue);
      if(model.leftValue ===)
      return { ...model, sourceLeft: true, leftValue }
    }
    case MSGS.RIGHT_VALUE: {
      if(msg.rightValue === '')
        return { ...model, sourceLeft: false, leftValue: '', rightValue: '' };
      const rightValue = toInt(msg.rightValue);
      return { ...model, sourceLeft: false, rightValue }
    }
    case MSGS.LEFT_UNIT: {
      const { leftUnit } = msg;
      return { ...model, leftUnit }
    }
    case MSGS.RIGHT_UNIT: {
      const { rightUnit } = msg;
      return { ...model, rightUnit }
    }
  }
  return model;
}

export default update;
