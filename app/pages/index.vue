<template>
	<v-container
		v-if="user || isUserLoggedIn"
		class="main-container"
		fluid
		column
		justify-center
		align-center
		pa-0
		fill-height
	>
		<v-row no-gutters>
			<v-col cols="sm">
				<v-card class="pa-2 transparent elevation-0">
					<artists-by-cats-listing />
				</v-card>
			</v-col>
			<v-col cols="sm">
				<v-card class="pa-2 events-listing-wrap transparent elevation-0">
					<events-by-artist-listing />
				</v-card>
			</v-col>
		</v-row>
	</v-container>
	<v-container v-else class="form-wrap">
		<ScaleLoader v-if="isLoading" class="spinner" color="#1976D2" />
		<login-form v-else :form-name="'Login'" :hide-close-btn="true" />
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { ScaleLoader } from '@saeris/vue-spinners'
import LoginForm from '~/components/molecules/form/LoginForm'
import eventsByArtistListing from '~/components/organisms/EventsByArtistListing'
import artistsByCatsListing from '~/components/organisms/ArtistsByCatsListing'

export default {
	components: {
		eventsByArtistListing,
		artistsByCatsListing,
		LoginForm,
		ScaleLoader
	},
	data() {
		return {
			isUserLoggedIn: !!this.$cookies.get('authId')
			// isLoading: false
		}
	},

	computed: {
		...mapGetters({
			// map `this.doneCount` to `this.$store.getters.doneTodosCount`
			isLoading: 'getIsLoading'
		}),

		...mapGetters('auth', {
			user: 'getAuthUser'
		})
	},

	mounted() {
		this.$store.subscribe((mutation, state) => {
			if (mutation.type === 'auth/SET_AUTH_ID') {
				this.isUserLoggedIn = !!mutation.payload.userId
			}
			if (mutation.type === 'users/SET_CURRENT_USER') {
				this.isUserLoggedIn = !!mutation.payload.uid
			}
			this.$forceUpdate()
		})

		// this.addHelpers()
		// this.$root.$on('userHasLoggedIn', (data) => {
		//   console.log('data')
		// })
	},
	methods: {
		addHelpers() {
			const elems = document.querySelectorAll('.has-helper')
			elems.forEach((el, idx) => {
				const div = document.createElement('div')
				const name = el.getAttribute('data-name')
				div.innerHTML = ` <div class="component-helper">${name}</div>`
				el.appendChild(div)
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.spinner {
	margin: 0 auto;
	text-align: center;
}
.form-wrap {
	max-width: 400px;
}
.main-container {
	max-width: 1200px;
}
</style>
