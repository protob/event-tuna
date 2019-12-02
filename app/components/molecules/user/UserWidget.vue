<template>
	<div>
		<div class="text-center">
			<v-menu open-on-hover offset-y bottom left>
				<template v-slot:activator="{ on }">
					<div v-on="on">
						<btn v-if="!isUserLoggedIn" depressed :icon="'user'"></btn>
					</div>

					<!-- <v-btn color="primary" dark v-on="on">{{ user.userName }}</v-btn> -->
				</template>
				<v-list>
					<v-list-item>
						<a @click.prevent="logout">Log Out</a>
					</v-list-item>
				</v-list>
			</v-menu>
		</div>
	</div>
</template>

<script>
import btn from '~/components/atoms/BaseBtn'
export default {
	name: 'UserWidget',
	components: { btn },
	props: ['user'],

	data() {
		return {}
	},
	methods: {
		logout() {
			this.$store.dispatch('auth/logOut')
			this.successRedirect()
		},
		successRedirect() {
			const redirectTo = this.$route.query.redirectTo || { path: '/' }
			this.$router.push(redirectTo)
		}
	}
}
</script>

<style lang="scss" scoped></style>
