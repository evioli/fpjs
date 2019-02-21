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

function fieldSet(dispatch, title, value, oninput)
{
  return div({ className: 'w-100 ma1' }, [
    div(title),
    input({
      className: 'w-100 pa2 input-reset',
      type: 'number',
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
        '$' + [value]
      ),
  ]);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    fieldSet(dispatch, 'Bill Amount', model.billAmount, e => dispatch(updateAmount(e.target.value))),
    fieldSet(dispatch, 'Tip %', model.tipPercent, e => dispatch(updateTip(e.target.value))),
    labelSet('Tip:', model.tipAmount),
    labelSet('Total', model.total),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
