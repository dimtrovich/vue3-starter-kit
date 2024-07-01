# Vue 3 Starter Kit

> 🖖 Un kit de démarrage simple pour le développement d'application Vue 3.

## Outils et bibliothèques spécifiques au projet

- [Vite](https://vitejs.dev/) Est utilisé comme serveur de développement et outil de construction.
- [Vue Router](https://router.vuejs.org/) est utilisé pour le routage.
- [Pinia](https://pinia.vuejs.org/) est utilisé pour la gestion des états. De plus, les données d'états peuvent être persistés grâce au plugin [pinia persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/).
- [Vue I18n](https://vue-i18n.intlify.dev/installation.html) est utilisé pour les traductions.
- [Vue Meta](https://github.com/nuxt/vue-meta) est utilisé pour la gestion des metadonnées HTML.
- [Axios](https://github.com/axios/axios) est utilisé pour effectuer des requêtes. Certains intercepteurs sont déjà définis dans src/plugins/axios.js
- [Dayjs](https://day.js.org) est utilisé pour manipuler aisement les dates
- [Bootstrap Vue Next](https://bootstrap-vue-next.github.io/bootstrap-vue-next/) est utilisé pour la mise en page avec Bootstrap 5


## Utilisation du template

### Template GitHub

[créer un dépôt à partir de ce modèle sur GitHub](https://github.com/dimtrovich/vue3-starter-kit/generate)

### Cloner en local

```bash
$> npx degit dimtrovich/vue3-starter-kit my-vue3-app
$> Done. Now run:
$>
$>   cd my-vue3-app
$>   pnpm install
$>   pnpm run lint
$>   pnpm run dev
```

## Configuration IDE recommandée

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Configuration du projet

```sh
npm install
```

### Compiler et recharger à chaud pour le développement

```sh
npm run dev
```

### Compiler et minimiser pour la production

```sh
npm run build
```

### Lint avec [ESLint](https://eslint.org/)

```sh
npm run lint
```

## License

[MIT](./LICENSE) - [@dimtrovich](https://github.com/dimtrovich)
