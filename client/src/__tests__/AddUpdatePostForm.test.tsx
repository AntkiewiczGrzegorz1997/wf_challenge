import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddUpdatePostForm from '../components/AddUpdatePostForm';

const middlewares: any[] = [];
const mockStore = configureStore(middlewares);

describe('AddUpdatePostForm', () => {
  it('renders AddUpdatePostForm', () => {
    const store = mockStore({ post: { currentPost: null } });
    render(
      <Provider store={store}>
        <AddUpdatePostForm />
      </Provider>
    );

    expect(screen.getByText(/Create a Post/i)).toBeInTheDocument();
    expect(screen.getByText(/Title/i)).toBeInTheDocument();
    expect(screen.getByTestId(/inputTitle/i)).toBeInTheDocument();
    expect(screen.getByText(/Content/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Post/i)).toBeInTheDocument();
  });

  it('allows input to be entered', () => {
    const store = mockStore({ post: { currentPost: null } });
    render(
      <Provider store={store}>
        <AddUpdatePostForm />
      </Provider>
    );

    const titleInput = screen.getByTestId(/inputTitle/i) as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    const contentInput = screen.getByTestId(
      /inputContent/i
    ) as HTMLInputElement;
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });
    expect(titleInput.value).toBe('Test Title');
    expect(contentInput.value).toBe('Test Content');
  });
});
