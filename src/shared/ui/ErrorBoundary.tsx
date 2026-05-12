'use client';

import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Log only to server-visible console; never expose stack to UI.
    console.error('[ErrorBoundary] caught', {
      message: error.message,
      stack: error.stack,
      componentStack: info.componentStack,
    });
  }

  reset = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          role="alert"
          className="flex min-h-[40vh] flex-col items-center justify-center gap-3 p-6 text-center text-white"
        >
          <h2 className="text-xl font-semibold">Algo salió mal</h2>
          <p className="text-sm text-gray-300">
            Recarga la página o vuelve más tarde. Si el problema persiste, contáctanos.
          </p>
          <button
            type="button"
            onClick={this.reset}
            className="mt-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-black hover:bg-amber-400"
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
