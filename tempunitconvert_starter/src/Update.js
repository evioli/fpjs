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
      if(msg.leftValue === '') {
        return { ...model, sourceLeft: true, leftValue: '', rightValue: '' };
      }

      const leftValue = R.pipe(
        parseFloat,
        R.defaultTo(''),
      )(msg.leftValue);

      if(model.leftUnit === model.rightUnit){
        return { ...model, sourceLeft: true, leftValue, rightValue: leftValue };
      }

      const rightValue = convertTemp(model);

      return { ...model, sourceLeft: true, leftValue, rightValue };
    }
    case MSGS.RIGHT_VALUE: {
      if(msg.rightValue === '') {
        return { ...model, sourceLeft: false, leftValue: '', rightValue: '' };
      }
      const rightValue = R.pipe(
        parseInt,
        R.defaultTo(''),
      )(msg.rightValue);

      if(model.leftUnit === model.rightUnit)
      {
        return { ...model, sourceLeft: false, leftValue: rightValue, rightValue }
      }

      const leftValue = convertTemp(model);

      return { ...model, sourceLeft: false, leftValue, rightValue }
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

function convertTemp(model)
{
  if(model.sourceLeft) {
    switch(model.leftUnit)
    {
      case 'Fahrenheit': {
        switch(model.rightUnit) {
          case 'Celsius': {
            return fahrenheitToCelsius(model.leftValue);
          }
          case 'Kelvin': {
            return R.pipe(fahrenheitToCelsius(model.leftValue), celsiusToKelvin());
          }
        }
      }

      case 'Celsius': {
        switch(model.rightUnit)
        {
          case 'Fahrenheit': {
            return celsiusToFahernheit(model.leftValue);
          }
          case 'Kelvin': {
            return celsiusToKelvin(model.leftValue);
          }
        }
      }

      case 'Kelvin': {
        switch(model.rightUnit) {
          case 'Fahrenheit': {
            return R.pipe(kelvinToCelsius(model.leftValue), celsiusToFahernheit());
          }
          case 'Celsius': {
            return kelvinToCelsius(model.leftValue);
          }
        }
      }
    }
    return model.leftValue;
  }
  else{
    switch(model.rightUnit)
    {
      case 'Fahrenheit': {
        switch(model.leftUnit) {
          case 'Celsius': {
            return fahrenheitToCelsius(model.rightValue);
          }
          case 'Kelvin': {
            return R.pipe(fahrenheitToCelsius(model.rightValue), celsiusToKelvin());
          }
        }
      }

      case 'Celsius': {
        switch(model.leftUnit)
        {
          case 'Fahrenheit': {
            return celsiusToFahernheit(model.rightValue);
          }
          case 'Kelvin': {
            return celsiusToKelvin(model.rightValue);
          }
        }
      }

      case 'Kelvin': {
        switch(model.leftUnit) {
          case 'Fahrenheit': {
            return R.pipe(kelvinToCelsius(model.rightValue), celsiusToFahernheit());
          }
          case 'Celsius': {
            return kelvinToCelsius(model.rightValue);
          }
        }
      }
    }
    return model.rightValue;
  }
}

const convertLeftFahrenheit = R.cond([
  [R.equals('Celsius'), temp => fahrenheitToCelsius(temp) ],
  [R.equals('Kelvin'), temp => R.pipe(fahrenheitToCelsius(temp), celsiusToKelvin())],
  [R.T, temp => temp],
]);

function fahrenheitToCelsius(temperature){
  return (5/9) * (temperature - 32.0);
}

function celsiusToFahernheit(temperature){
  return (9/5) * temperature + 32.0;
}

function kelvinToCelsius(temperature){
  return temperature - 273.15;
}

function celsiusToKelvin(temperature){
  return temperature + 273.15;
}

export default update;
