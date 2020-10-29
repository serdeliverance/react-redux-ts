import React from 'react'
import { connect } from 'react-redux'
import { Todo, fetchTodos, deleteTodo } from '../actions'
import { StoreState } from '../reducers/index'

interface AppProps {
  todos: Todo[]
  fetchTodos: Function
  deleteTodo: Function
}

interface AppState {
  fetching: boolean
}

class _App extends React.Component<AppProps, AppState> {

  state = { fetching: false}

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false})
    }
  }

  onButtonClick = (): void => {
    this.props.fetchTodos()
    this.setState({ fetching: true })
  }

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  }

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
          <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
            {todo.title}
          </div>
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch</button>
        {this.state.fetching ? 'LOADING' : null}
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = (state: StoreState): { todos: Todo[] } => {
  return { todos: state.todos }
}

export const App = connect(
  mapStateToProps,
  { fetchTodos, deleteTodo }
)(_App)
