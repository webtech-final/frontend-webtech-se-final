<template>
	<div class="flex shadow-md">
		<div
			class="
				grid-cols-1
				p-10
				border-2
				bg-gradient-to-b
				from-indigo-50
				to-purple-300
			"
		>
			<div class="text-center text-3xl m-2 mx-auto place-self-center">
				<a class="text-center w-full">PLEASE ENTER ROOM PIN BELOW</a>
			</div>
			<div class="my-7 relative">
				<input
					class="
						input
						border border-gray-400
						appearance-none
						rounded
						w-full
						px-3
						py-3
						pt-5
						pb-2
						focus
						focus:border-indigo-600
						focus:outline-none
						active:outline-none
						active:border-indigo-600
					"
					id=""
					type="text"
					autofocus
				/>
				<label
					for="email"
					class="
						label
						absolute
						mb-0
						-mt-2
						pt-4
						pl-3
						leading-tighter
						text-gray-400 text-base
						mt-2
						cursor-text
					"
					>Room Pin</label
				>
			</div>
			<div class="flex justify-center">
				<button
					class="
						items-center
						justify-center
						py-3
						px-6
						text-white
						rounded-lg
						shadow-lg
						block
						md:inline-block
					"
					:class="msg === 'JOIN' ? 'bg-blue-400' : 'bg-red-400'"
					@click="handleBtn"
				>
					{{ msg }}
				</button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "EnterRoom",
		props: ["msg"],
		methods: {
			handleBtn() {
				this.$emit("onHome", this.msg);
			},
		},
	};
</script>
<style lang="scss" scoped></style>
