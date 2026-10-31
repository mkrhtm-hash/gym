import { Component } from 'react'
import { RotateCcw, TriangleAlert } from 'lucide-react'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('YouFit crashed:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="grid min-h-[60vh] place-items-center p-6">
        <div className="glass max-w-md rounded-3xl p-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-rose/15 text-rose">
            <TriangleAlert size={26} />
          </div>
          <h2 className="text-2xl font-bold">Oof, we dropped the bar.</h2>
          <p className="mt-2 text-sm text-muted">
            Something went wrong on this screen. Your data is safe. Give it another rep.
          </p>
          <button className="btn-primary mt-6" onClick={() => this.setState({ error: null })}>
            <RotateCcw size={16} /> Try again
          </button>
        </div>
      </div>
    )
  }
}
