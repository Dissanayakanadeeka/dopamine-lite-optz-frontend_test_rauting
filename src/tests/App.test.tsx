import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store"; // Correct import
import App from "../App";
import { getCurrentUser, fetchAuthSession } from "@aws-amplify/auth";

// Mock AWS Amplify Auth functions
jest.mock("@aws-amplify/auth", () => ({
  getCurrentUser: jest.fn(),
  fetchAuthSession: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
  Box: 'div',
  Spinner: 'div',
  createStandaloneToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

// Create a mock Redux store
const mockStore = configureMockStore([]);
const initialState = { user: { isAuthenticated: false, isLoading: false } };

test("redirects to LoginPage if user is not authenticated", async () => {
  (getCurrentUser as jest.Mock).mockRejectedValue(new Error("Not authenticated"));
  (fetchAuthSession as jest.Mock).mockResolvedValue(Promise.resolve({ tokens: null }));

  const store = mockStore(initialState);

  await act(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  // Check if login page text appears
  expect(screen.getByText(/Dopamine Lite/i)).toBeInTheDocument();
  expect(screen.getByText(/Your journey to mastering biology starts here/i)).toBeInTheDocument();
});
