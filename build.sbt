import ProjectInfo._
import kevinlee.sbt.SbtCommon._
import just.semver.SemVer
import sbt.ScmInfo

val ProjectScalaVersion: String = "2.12.11"
val CrossScalaVersions: Seq[String] = Seq(ProjectScalaVersion)

val GlobalSbtVersion: String = "1.3.10"

val CrossSbtVersions: Seq[String] = Seq(GlobalSbtVersion)

val hedgehogVersion: String = "bd4e0cc785915e0af20d2a7ead5267d49b1de7b1"

val hedgehogRepo: Resolver =
  "bintray-scala-hedgehog" at "https://dl.bintray.com/hedgehogqa/scala-hedgehog"

val hedgehogLibs: Seq[ModuleID] = Seq(
    "qa.hedgehog" %% "hedgehog-core" % hedgehogVersion % Test
  , "qa.hedgehog" %% "hedgehog-runner" % hedgehogVersion % Test
  , "qa.hedgehog" %% "hedgehog-sbt" % hedgehogVersion % Test
  )

val cats: ModuleID = "org.typelevel" %% "cats-core" % "2.1.1"
val catsEffect: ModuleID = "org.typelevel" %% "cats-effect" % "2.1.3"
val github4s: ModuleID = "com.47deg" %% "github4s" % "0.24.0"

val http4sVersion: String = "0.21.3"
val http4sDsl: ModuleID = "org.http4s" %% "http4s-dsl" % http4sVersion
val http4sClient: ModuleID = "org.http4s" %% "http4s-blaze-client" % http4sVersion

val effectie: ModuleID = "io.kevinlee" %% "effectie-cats-effect" % "1.0.0"
val loggerFCatsEffect: ModuleID = "io.kevinlee" %% "logger-f-cats-effect" % "0.3.1"

lazy val root = (project in file("."))
  .settings(
    organization := "io.kevinlee"
  , name         := "sbt-github-pages"
  , scalaVersion := ProjectScalaVersion
  , version      := ProjectVersion
  , description  := "sbt plugin to publish GitHub Pages"
  , developers   := List(
      Developer("Kevin-Lee", "Kevin Lee", "kevin.code@kevinlee.io", url("https://github.com/Kevin-Lee"))
    )
  , homepage := Some(url("https://github.com/Kevin-Lee/sbt-github-pages"))
  , scmInfo :=
      Some(ScmInfo(
        url("https://github.com/Kevin-Lee/sbt-github-pages")
      , "git@github.com:Kevin-Lee/sbt-github-pages.git"
    ))

  , startYear := Some(2020)
  , sbtPlugin := true
  , sbtVersion in Global := GlobalSbtVersion
  , crossSbtVersions := CrossSbtVersions
  , scalacOptions ++= crossVersionProps(commonScalacOptions, SemVer.parseUnsafe(scalaVersion.value)) {
        case (SemVer.Major(2), SemVer.Minor(12)) =>
          Seq("-Ywarn-unused-import", "-Ywarn-numeric-widen")
        case (SemVer.Major(2), SemVer.Minor(11)) =>
          Seq("-Ywarn-numeric-widen")
        case _ =>
          Nil
      }
  , scalacOptions in (Compile, console) := scalacOptions.value diff List("-Ywarn-unused-import", "-Xfatal-warnings")
  , wartremoverErrors in (Compile, compile) ++= commonWarts
  , wartremoverErrors in (Test, compile) ++= commonWarts
  , resolvers += hedgehogRepo
  , addCompilerPlugin("org.typelevel" %% "kind-projector" % "0.11.0" cross CrossVersion.full)
  , addCompilerPlugin("com.olegpy" %% "better-monadic-for" % "0.3.1")
  , libraryDependencies ++= Seq(cats, catsEffect, github4s, http4sDsl, http4sClient, effectie, loggerFCatsEffect) ++ hedgehogLibs
  , testFrameworks ++= Seq(TestFramework("hedgehog.sbt.Framework"))

  , licenses += ("MIT", url("http://opensource.org/licenses/MIT"))
  , publishMavenStyle := false

  , bintrayPackageLabels := Seq("sbt", "plugin")
  , bintrayVcsUrl := Some("""git@github.com:Kevin-Lee/sbt-github-pages.git""")
  , bintrayRepository := "sbt-plugins"


)
