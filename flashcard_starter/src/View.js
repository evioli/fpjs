import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

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
    className: 'mv2 flex justify-between'
  },
  [
    button({
      className: 'f4 ph3 pv2 bg-red bn white br1'
    },
    'Bad'
    ),
    button({
      className: 'f4 ph3 pv2 bg-blue bn white br1'
    },
    'Good'
    ),
    button({
      className: 'f4 ph3 pv2 bg-dark-green bn white br1'
    },
      'Great'
    ),
  ]);
}

function flashCard(dispatch)
{
  return div({
    className: 'w-third pa2'
  },
  [
    div({
      className: 'w-100 pa2 bg-light-yellow shadow-1 mv2 relative pb5'
    },
    [
      labelSet('Question', 'Question text'),
      labelSet('Answer', 'Answer text'),
      div({
        className: 'absolute bottom-0 left-0 w-100 ph2'
      },
      [
        rankSet(),
      ]),
      i({
        className: 'absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer'
      }),
    ]),
  ]);
}

function view(dispatch, model) {
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Flashcard Study'),
    addButton(dispatch),
    div({
      className: 'flex flex-wrap nl2 nr2'
    },
    [
      flashCard(dispatch),
    ]),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
