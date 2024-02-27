import { For, createSignal } from 'solid-js';
import AssetCard from './AssetCard';

const assets = [
	{
		id: 'AFZPUAIYVPNUYGJRQVLUKOPPVLHAZQTGLYAAUUNBXFTVTAMSBKQBLECsEP',
		name: 'ASSETXX',
		quantity: '213,213',
		energy: '100B',
		status: 'Owned',
		managingContractIndex: 1,
	},
	{
		id: 'AFZPUAIYVPNUYGJRQVLUKOPPVLHAZQTGLYAAUUNBXFTVTAMSBKQBLECsEP',
		name: 'ASSETYY',
		quantity: '123,213',
		energy: '100B',
		status: 'Owned',
		managingContractIndex: 1,
	},
	{
		id: 'AFZPUAIYVPNUYGJRQVLUKOPPVLHAZQTGLYAAUUNBXFTVTAMSBKQBLECsEP',
		name: 'ASSETZZ',
		quantity: '123,213',
		energy: '100B',
		status: 'Owned',
		managingContractIndex: 1,
	},
	{
		id: 'AFZPUAIYVPNUYGJRQVLUKOPPVLHAZQTGLYAAUUNBXFTVTAMSBKQBLECsEP',
		name: 'ASSETAA',
		quantity: '123,213',
		energy: '100B',
		status: 'Owned',
		managingContractIndex: 1,
	},
];

const filters = ['All', 'SC Shares', 'Live IPOs'];

export default function AssetsTable() {
	const [filter, setFilter] = createSignal('All');

	const handleSetFilter = (filter) => {
		setFilter(filter);
	};

	return (
		<section class="border rounded-xl w-full bg-white mb-16">
			<div class="flex items-center border-b sticky top-10 bg-white rounded-t-xl">
				{/* Filters */}
				<ul class="flex">
					<For each={filters}>
						{(filterValue) => (
							<li>
								<button
									class={`w-40 text-sm text-muted-foreground px-4 py-3 ${
										filter() === filterValue
											? 'border-b-indigo-500 border-b-2'
											: ''
									}`}
									onClick={() => handleSetFilter(filterValue)}
								>
									{filterValue}
								</button>
							</li>
						)}
					</For>
				</ul>
			</div>
			<div>
				<For each={assets}>
					{(asset, index) => (
						<AssetCard
							{...asset}
							class={index() === 0 && 'border-0'}
						/>
					)}
				</For>
			</div>
		</section>
	);
}
