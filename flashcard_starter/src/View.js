import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { disconnect } from 'cluster';

const {
  pre,
  div,
  h1,
  button,
  i,
} = hh(h);

function addButton(dispatch)
{
  return div([
    button({
      className: 'pa2 br1 mv2 bg-green bn white'
    },
    [
      i( {
        className: 'fa fa-plus ph1'
      }),
      'Add Flashcard',
    ]),
  ]);
}

function labelSet(title, text)
{
  return div([
    div({
      className: 'b f6 mv1 underline'
    },
    title,
    ),
    div({
      className: 'pointer'
    },
    text,
    ),
  ]);
}

function rankSet()
{
  return div({
    className: 'absolute bottom-0 left-00 w-100 ph2'
  },
  [

  ]);
}

function flashCard(dispatch)
{
  return div({
    className: 'w-third pa2'
  },
  [
    div({
      className: 'w-100 pa2 bg-light-yellow shadow-1 mv2 realtive pb5'
    },
    [
      labelSet('Question', 'Question text'),
      labelSet('Answer', 'Answer text'),
    ]),
  ]);
}

function view(dispatch, model) {
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Flashcard Study'),
    addButton(dispatch),
    flashCard(dispatch),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
