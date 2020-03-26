<template>
    <div class="pt-3 container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="pt-3">
                    <h2>
                        <router-link to="/index" class="m-6">Notes</router-link>
                    </h2>
                </div>
                <router-link data-cy="new-note" to="/create" class="btn btn-sm btn-primary"
                             v-if="this.$store.state.token">New note
                </router-link>
                <button data-cy="logout" class="ml-2 btn btn-sm btn-primary" v-on:click="logout()"
                        v-if="this.$store.state.token">Logout
                </button>

                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        methods: {
            logout: function () {

                axios.post('api/accounts/logout/', {})
                    .then(() => {
                        this.$store.commit('LOGOUT_SUCCESS');
                        this.$router.push('/login');
                    });
            }
        },
    }
</script>