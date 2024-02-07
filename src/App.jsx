import { Header } from './components';

function App() {
	return (
		<div class="w-[var(--vw)] h-[var(--vh)] overflow-hidden">
			<Header />
			<main class="h-[var(--container-height)] w-full">
				<div class="flex justify-center items-center h-full">
					<h1 class="text-3xl font-bold text-blue-dashed-text">
						Welcome to Qx
					</h1>
				</div>
			</main>
		</div>
	);
}

export default App;
