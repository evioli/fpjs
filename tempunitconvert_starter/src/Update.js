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
        parseInt,
        R.defaultTo('')
        )(msg.leftValue);

      return convert({ ...model, sourceLeft: true, leftValue });
    }
    case MSGS.RIGHT_VALUE: {
      if(msg.rightValue === '') {
        return { ...model, sourceLeft: false, leftValue: '', rightValue: '' };
      }
      const rightValue = R.pipe(
        parseInt,
        R.defaultTo('')
        )(msg.rightValue);

      return convert({ ...model, sourceLeft: false, rightValue });
    }
    case MSGS.LEFT_UNIT: {
      const { leftUnit } = msg;
      return convert({ ...model, leftUnit });
    }
    case MSGS.RIGHT_UNIT: {
      const { rightUnit } = msg;
      return convert({ ...model, rightUnit });
    }
  }
  return model;
}

function round(number) {
  return Math.round(number * 10) / 10;
}

function convert(model)
{
  const {leftValue, leftUnit, rightValue, rightUnit } = model;

  const [fromUnit, fromTemp, toUnit] =
  model.sourceLeft
  ? [leftUnit, leftValue, rightUnit]
  : [rightUnit, rightValue, leftUnit];

  const otherValue = R.pipe(
    convertFromToTemp,
    round,
  )(fromUnit, toUnit, fromTemp);

  return model.sourceLeft
  ? { ...model, rightValue: otherValue }
  : { ...model, leftValue: otherValue };
}

function convertFromToTemp(fromUnit, toUnit, temp)
{
  const convertFn = R.pathOr(
    R.identity,
    [fromUnit, toUnit],
    UnitConversions
  );

  return convertFn(temp);
}


function fahrenheitToCelsius(temperature){
  return 5 / 9 * (temperature - 32.0);
}

function celsiusToFahernheit(temperature){
  return  9 / 5 * temperature + 32.0;
}

function kelvinToCelsius(temperature){
  return temperature - 273.15;
}

function celsiusToKelvin(temperature){
  return temperature + 273.15;
}

const fahrenheitToKelvin = R.pipe(fahrenheitToCelsius, celsiusToKelvin);
const kelvinToFahrenheit = R.pipe(kelvinToCelsius, celsiusToFahernheit);

const UnitConversions = {
  Celsius: {
    Fahrenheit: celsiusToFahernheit,
    Kelvin: celsiusToKelvin,
  },
  Fahrenheit: {
    Celsius: fahrenheitToCelsius,
    Kelvin: fahrenheitToKelvin,
  },
  Kelvin: {
    Celsius: kelvinToCelsius,
    Fahrenheit: kelvinToFahrenheit,
  },
};

export default update;
