import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { updateAmount, updateTip } from './Update';

const {
  div,
  h1,
  pre,
  input
} = hh(h);

const round = places =>
R.pipe(
  num => num * Math.pow(10, places),
  Math.round,
  num => num * Math.pow(10, -1 * places),
);


const formatMoney = R.curry(
  (symbol, places, number ) => {
    return R.pipe(
      R.defaultTo(0),
      round(places),
      num => num.toFixed(places),
      R.concat(symbol),
    )(number);
  }
);

function inputSet( title, value, oninput)
{
  return div({ className: 'w-100 ma1' }, [
    div(title),
    input({
      className: 'w-100 pa2 input-reset',
      type: 'text',
      value,
      oninput: oninput
    }),
  ]);
}

function labelSet(title, value)
{
  return div([
    div({
      className: 'fl w-50'
      },
      title),
      div(
        value
      ),
  ]);
}

function view(dispatch, model) {
  const toMoney = formatMoney('$', 2);

  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    inputSet('Bill Amount', model.billAmount, e => dispatch(updateAmount(e.target.value))),
    inputSet('Tip %', model.tipPercent, e => dispatch(updateTip(e.target.value))),
    labelSet('Tip:', toMoney(model.tipAmount)),
    labelSet('Total', toMoney(model.total)),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
