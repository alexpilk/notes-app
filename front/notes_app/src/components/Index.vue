<template>
    <div data-cy="container" class="pt-5">

        <div v-if="notes && notes.length">
            <div class="card mb-3" v-for="note of notes" v-bind:key="note.id">
                <div class="card-header">
                    Expires {{ convertDate(note.expiration_date) }}
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{ note.name }}</h5>
                    <p class="card-text">{{ note.text.length > 100 ? note.text.substring(0,100) + "..." :
                        note.text}}</p>
                    <router-link :to="{name: 'edit', params: { id: note.id }}" class="btn btn-sm btn-primary">Edit
                    </router-link>
                    <button class="btn btn-danger btn-sm ml-1" v-on:click="deleteNote(note)">Delete</button>
                </div>
            </div>
        </div>
        <p v-if="notes.length == 0">No notes</p>
    </div>
</template>
<script>
    import axios from 'axios';
    import moment from 'moment';

    export default {
        data() {
            return {
                notes: []
            }
        },
        created() {
            this.all();
        },
        methods: {
            convertDate: function (date) {
                return moment(Date.parse(date)).utc().from(new Date())
            },
            deleteNote: function (note) {
                if (confirm('Delete ' + note.name)) {
                    axios.delete(`http://127.0.0.1:8000/api/notes/${note.id}/`)
                        .then(() => {
                            this.all();
                        });
                }
            },
            all: function () {
                axios.get('http://127.0.0.1:8000/api/notes/', {headers: {'Authorization': `Token ${this.$store.state.token}`}})
                    .then(response => {
                        this.notes = response.data
                    });
            }
        },
    }
</script>