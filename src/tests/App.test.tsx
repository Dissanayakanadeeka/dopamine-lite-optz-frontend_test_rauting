import { render, screen } from "@testing-library/react";
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

// Create a mock Redux store
const mockStore = configureMockStore([]);
const initialState = { user: { isAuthenticated: false, isLoading: false } };

test("redirects to LoginPage if user is not authenticated", async () => {
  (getCurrentUser as jest.Mock).mockRejectedValue(new Error("Not authenticated"));
  (fetchAuthSession as jest.Mock).mockResolvedValue(Promise.resolve({ tokens: null }));

  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // Check if login page text appears
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});
