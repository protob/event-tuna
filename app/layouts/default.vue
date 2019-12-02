<template>
	<v-app dark>
		<!---nav left-->
		<v-navigation-drawer
			v-model="drawer"
			:mini-variant="miniVariant"
			:clipped="clipped"
			fixed
			app
		>
			<v-list>
				<v-list-item>
					<btn
						depressed
						:icon="'user'"
						:icon-class="'hidden-lg-and-up'"
						:content-class="'hidden-md-and-down'"
						@click="showModal('Login')"
					>LOGIN</btn>
				</v-list-item>

				<v-list-item>
					<btn
						depressed
						:icon="'userPlus'"
						:icon-class="'hidden-lg-and-up'"
						:content-class="'hidden-md-and-down'"
						@click="showModal('Register')"
					>REGISTER</btn>
				</v-list-item>

				<v-list-item>
					<btn
						depressed
						:icon="'userPlus'"
						:icon-class="'hidden-lg-and-up'"
						:content-class="'hidden-md-and-down'"
						@click="showModal('Register')"
					>RECOVERY</btn>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar :clipped-left="clipped" fixed app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />

			<!-- top toolbars-->

			<v-container fluid>
				<v-row d-flex justify-space-between class="top-bar-area">
					<v-col cols="12" lg="3" md="3" sm="4" class="hidden-sm-and-down">
						<btn
							depressed
							:icon="'cloud'"
							:icon-class="'hidden-lg-and-up'"
							:content-class="'hidden-md-and-down'"
						>Update</btn>

						<btn
							depressed
							:icon="'cloud'"
							:icon-class="'hidden-lg-and-up'"
							:content-class="'hidden-md-and-down'"
						>Planner</btn>
					</v-col>
					<v-col
						cols="12"
						lg="6"
						md="6"
						sm="4"
						class="d-none d-md-flex justify-center hidden-sm-and-down"
					>
						<geo-time-toolbar class="hidden-sm-and-down" />

						<btn depressed :css-class="'mx-1 hidden-md-and-up'" :icon="'calendar'" />
					</v-col>

					<v-col cols="12" lg="3" md="3" sm="12" class="d-flex justify-end">
						<nuxt-link to="/">
							<btn
								:css-class="'mx-1 d-none d-lg-flex'"
								:content-class="'hidden-sm-and-down'"
							>HOME</btn>
						</nuxt-link>
						<btn
							v-if="!isUserLoggedIn"
							depressed
							:icon="'userPlus'"
							:icon-class="'hidden-lg-and-up'"
							:content-class="'hidden-md-and-down'"
							@click="showModal('Register')"
						>REGISTER</btn>
						<btn
							v-if="!isUserLoggedIn"
							depressed
							:icon="'user'"
							:icon-class="'hidden-lg-and-up'"
							:content-class="'hidden-md-and-down'"
							@click="showModal('Login')"
						>LOGIN</btn>
						<user-widget v-if="user" :user="user" />
					</v-col>
				</v-row>
			</v-container>
			<!-- /top toolbars-->
		</v-app-bar>

		<!--content-->
		<v-content>
			<v-container fill-height>
				<nuxt />
			</v-container>
		</v-content>
		<base-modal />
		<!--footer-->
		<v-footer :fixed="fixed" app>
			<span>&copy; 2019</span>
		</v-footer>
	</v-app>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import GeoTimeToolbar from '~/components/molecules/toolbar/GeoTimeToolbar'
import BaseModal from '~/components/molecules/form/BaseModal'
import userWidget from '~/components/molecules/user/UserWidget'
import btn from '~/components/atoms/BaseBtn'
export default {
	components: {
		GeoTimeToolbar,
		BaseModal,
		userWidget,
		btn
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
	},
	data() {
		return {
			isUserLoggedIn: !!this.$cookies.get('authId'),
			clipped: true,
			drawer: false,
			fixed: false,
			items: [
				{
					icon: 'mdi-apps',
					title: 'Welcome',
					to: '/'
				},
				{
					icon: 'mdi-chart-bubble',
					title: 'Inspire',
					to: '/inspire'
				}
			],
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: 'Vuetify.js'
		}
	},
	computed: {
		...mapGetters({
			user: 'auth/getAuthUser'
		})
	},
	methods: {
		...mapMutations(['showModal'])
	}
}
</script>
<style></style>
