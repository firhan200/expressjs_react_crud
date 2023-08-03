import { Suspense } from "react"
import { Outlet } from "react-router-dom"

function App() {
	return (
		<div className="container mx-auto my-16 px-8 xxl:px-0">
			<Suspense fallback={<>loading...</>}>
				<Outlet />
			</Suspense>
		</div>
	)
}

export default App
