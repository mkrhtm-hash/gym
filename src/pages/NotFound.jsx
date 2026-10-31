import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import Page from '../components/Page'
import EmptyState from '../components/EmptyState'

export default function NotFound() {
  return (
    <Page title="Not found" className="grid min-h-[60vh] place-items-center">
      <div className="w-full max-w-lg">
        <EmptyState
          icon={Compass}
          title="This page skipped leg day"
          message="We couldn’t find what you were looking for. Let’s get you back to the good stuff."
          action={<Link to="/dashboard" className="btn-primary">Back to dashboard</Link>}
        />
      </div>
    </Page>
  )
}
