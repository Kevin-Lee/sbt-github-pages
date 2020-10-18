(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{135:function(e,n,s){"use strict";s.r(n),s.d(n,"frontMatter",(function(){return u})),s.d(n,"metadata",(function(){return b})),s.d(n,"rightToc",(function(){return c})),s.d(n,"default",(function(){return r}));var t=s(2),i=s(10),a=(s(0),s(161)),u={id:"examples",title:"Examples",sidebar_label:"Examples"},b={id:"examples",isDocsHomePage:!1,title:"Examples",description:"Docusaurus + GitHub Actions",source:"@site/docs/examples.md",permalink:"/docs/examples",sidebar_label:"Examples",sidebar:"someSidebar",previous:{title:"Run to Publish GitHub Pages",permalink:"/docs/run"}},c=[{value:"Docusaurus + GitHub Actions",id:"docusaurus--github-actions",children:[{value:"plugins.sbt",id:"pluginssbt",children:[]},{value:"build.sbt",id:"buildsbt",children:[]},{value:"GitHub Actions",id:"github-actions",children:[]}]}],o={rightToc:c};function r(e){var n=e.components,s=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(t.a)({},o,s,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"docusaurus--github-actions"},"Docusaurus + GitHub Actions"),Object(a.b)("pre",null,Object(a.b)("code",Object(t.a)({parentName:"pre"},{}),"Project\nRoot \u2500\u252c\u2500 project\n      \u251c\u2500 src\n      \u251c\u2500 ... more directories\n      \u2514\u2500 website\u2500\u252c\u2500 blog\n                 \u251c\u2500 docs\n                 \u251c\u2500 build <== Contains website files\n                 \u251c\u2500 node_modules\n                 \u2514\u2500 ... more directories\n")),Object(a.b)("h3",{id:"pluginssbt"},"plugins.sbt"),Object(a.b)("p",null,"In the ",Object(a.b)("inlineCode",{parentName:"p"},"project/plugins.sbt")),Object(a.b)("pre",null,Object(a.b)("code",Object(t.a)({parentName:"pre"},{className:"language-sbt"}),'addSbtPlugin("io.kevinlee" % "sbt-github-pages" % "0.3.0")\n')),Object(a.b)("h3",{id:"buildsbt"},"build.sbt"),Object(a.b)("p",null,"In ",Object(a.b)("inlineCode",{parentName:"p"},"build.sbt"),","),Object(a.b)("pre",null,Object(a.b)("code",Object(t.a)({parentName:"pre"},{className:"language-scala"}),'lazy val root = (project in file("."))\n  .enablePlugins(GitHubPagesPlugin)\n  .settings(\n    name := "YOUR_PROJECT",\n    gitHubPagesOrgName := "USERNAME_OR_ORG",\n    gitHubPagesRepoName := "YOUR_PROJECT",\n    gitHubPagesSiteDir := baseDirectory.value / "path/to/github-pages-root"\n  )\n')),Object(a.b)("h3",{id:"github-actions"},"GitHub Actions"),Object(a.b)("p",null,"In your GitHub Actions config file,"),Object(a.b)("p",null,"e.g.) ",Object(a.b)("inlineCode",{parentName:"p"},".github/workflows/publish-github-pages.yml")),Object(a.b)("pre",null,Object(a.b)("code",Object(t.a)({parentName:"pre"},{className:"language-yaml"}),"name: Publish GitHub Pages\n\non:\n  push:\n    branches:\n      - publish-docs\n\njobs:\n  build:\n\n    runs-on: ubuntu-latest\n\n    steps:\n      - uses: actions/checkout@v2\n      - uses: actions/setup-node@v1\n        with:\n          node-version: '14.2.0'\n          registry-url: 'https://registry.npmjs.org'\n\n      - name: Cache Coursier\n        uses: actions/cache@v1\n        with:\n          path: ~/.cache/coursier\n          key: ${{ runner.os }}-coursier-scala-2_13-${{ hashFiles('**/*.sbt') }}-${{ hashFiles('**/build.properties') }}\n          restore-keys: |\n            ${{ runner.os }}-coursier-scala-2_13-\n\n      - name: Cache Ivy\n        uses: actions/cache@v1\n        with:\n          path: ~/.ivy2/cache\n          key: ${{ runner.os }}-ivy-scala-2_13-${{ hashFiles('**/*.sbt') }}-${{ hashFiles('**/build.properties') }}\n          restore-keys: |\n            ${{ runner.os }}-ivy-scala-2_13-\n\n      - name: Cache npm\n        uses: actions/cache@v1\n        with:\n          path: ~/.npm\n          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}\n          restore-keys: |\n            ${{ runner.os }}-node-\n\n      - name: Build and publish website using Docusaurus\n        env:\n          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}\n        run: |\n          cd website\n          echo \"> Install packages\"\n          npm install\n          echo \"> Build the website using Docusaurus\"\n          rm -Rf build\n          npm run build\n          cd ..\n          echo \"> Publish to GitHub Pages\"\n          sbt publishToGitHubPages\n\n")),Object(a.b)("p",null,"Pushing to ",Object(a.b)("inlineCode",{parentName:"p"},"publish-docs")," branch triggers the publish build in GitHub Actions."))}r.isMDXComponent=!0}}]);