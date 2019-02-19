import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const {
  div,
  h1,
  pre,
  select,
  option,
  input
} = hh(h);

function dropDown() {
  return select('', [
    option('', 'Fahrenheit'),
    option('', 'Celsius'),
    option('', 'Kelvin'),
    //onchange:
  ])
}

function inputSet(className,inputValue, oninput) {
  return div({
    className: className
  },
  [
    input({
      className: 'pa2 input-reset bs w-100 mb2',
      type: 'text',
      value: inputValue,
      oninput: oninput,
    }),
    dropDown()
  ]);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Temperature Unit Converter'),
    div([
      inputSet('fl w-40 pa2', 0, null),
      div({
        className: 'fl w-20 pa2'
      }, '='),
      inputSet('fl w-40 pa2', 32, null)
    ]),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
