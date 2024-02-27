import { FormActions, Input } from '@/components/ui';
import { BackButton } from '@/components/ui/buttons';

export default function Transfer() {
	// TODO: Implement the EnergyTransfer view funcionality
	// This could be trasnfer page and have tabs for different types of transfer (QUs, Assets,...)
	return (
		<section class="grid place-items-center gap-6">
			<BackButton />
			<div class="grid place-items-center gap-2">
				<h1 class="text-2xl">Energy Transfer (QUs)</h1>

				<div class="grid place-items-center gap-1">
					<h2 class="text-xs">Source ID</h2>
					<span class="text-xxs border p-2 rounded-lg">
						AFZPUAIYVPNUYGJRQVLUKOPPVLHAZQTGLYAAUUNBXFTVTAMSBKQBLEIEPCVJ
					</span>
				</div>
			</div>

			<form class="grid gap-6 border-t border-gray-200 pt-10 mt-4">
				<Input label="Destination ID" color="secondary" />
				<div class="grid grid-cols-3 gap-4">
					<div class="col-span-2">
						<Input label="Destination ID" color="secondary" />
					</div>
					<Input label="Destination ID" color="secondary" />
				</div>
				<FormActions />
			</form>
		</section>
	);
}
