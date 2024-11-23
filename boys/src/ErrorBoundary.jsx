// ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has been caught
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service (for example, Sentry, LogRocket, etc.)
    console.error("Error caught by Error Boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Customize the fallback UI
      return (
        <div>
          <h2>Something went wrong!</h2>
          <details>
            <summary>Click for more info</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
