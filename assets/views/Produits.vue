<template>
  <div class="mx-auto max-width-dt">
    <v-progress-linear v-show="isLoading" indeterminate color="blue-grey"></v-progress-linear>

    <v-row class="tableHeader">
      <v-col cols="12" sm="6" md="8">
        <h1>Produits</h1>
      </v-col>
      <v-col cols="6" md="4" class="d-flex align-end">
        <v-spacer></v-spacer>
        <v-btn depressed @click="newProduit()" class="ml-auto">
          Ajouter un produit
        </v-btn>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="5">
        <v-data-table :headers="headers" :items="listeProduits" :items-per-page="10" class="elevation-1">
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.nom }}</td>
              <td>
                <v-layout justify-center>
                  <v-icon small class="mr-2" @click="editProduit(row.item.id)">mdi-pencil</v-icon>
                  <v-icon small @click="dialogDeleteProduit(row.item.id)">mdi-delete</v-icon>
                </v-layout>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="7">
        <FicheProduit :editProduitId="this.editProduitId" :editNewProduit="this.editNewProduit" @editDone="editDone">
        </FicheProduit>
      </v-col>
  </v-row>

    <v-dialog v-model="confirmDeleteProduit" max-width="800">
      <v-card class="editBox">
        <v-card-actions>
          Supprimer ce produit ?
          <v-spacer></v-spacer>
          <v-btn depressed @click="confirmDeleteProduit = false">
            Annuler
          </v-btn>
          <v-btn depressed @click="deleteProduit()">
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <SnackBar />
    <Progress></Progress>
  </div>
</template>

<script>
import FicheProduit from './components/FicheProduit.vue'
import SnackBar from '../components/SnackBar.vue'
import Progress from '../components/Progress.vue'

export default {
  name: 'Produits',
  components: {
    FicheProduit,
    SnackBar,
    Progress
  },
  mounted() {
    this.$store.dispatch('produits/getProducts').then(() => {
      this.listeProduits = this.$store.state.produits.all;
      this.isLoading = false;
    });
  },
  data: () => ({
    isLoading: true,
    listeProduits: [],
    editProduitId: null,
    editNewProduit: false,
    confirmDeleteProduit: false,
    ProduitToDeleteId: false,
    headers: [
      { text: 'Produit', value: 'nom', sortable: false, align: 'start' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
    ],
  }),
  methods: {
    editProduit: function (id) {
      this.editProduitId = id;
      this.editNewProduit = false;
    },
    newProduit: function () {
      this.editNewProduit = true;
    },
    dialogDeleteProduit: function (id) {
      this.ProduitToDeleteId = id;
      this.confirmDeleteProduit = true;
    },
    deleteProduit: function () {
      this.$store.dispatch('produits/deleteProduit', this.ProduitToDeleteId);
      this.confirmDeleteProduit = false;
    },
    editDone: function (Produit) {
      this.editProduitId = null;
      this.editNewProduit = false;
    }
  }
}
</script>