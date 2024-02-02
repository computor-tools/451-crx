import { Header } from './components';

function App() {
	return (
		<div class="min-w-[800px] min-h-[500px]">
			<Header />
			<main class="bg-blue-dashed-bg h-screen w-screen -mt-2">
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
