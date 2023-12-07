# test

```shell
git flow init -d

git flow feature start <your feature>

git flow feature publish <your feature>

```

For feature branches, the `<base>` arg must be a branch, when omitted it defaults to the develop branch.

- To push/pull a feature branch to the remote repository, use:

```shell
git flow feature publish <name>
git flow feature track <name>
```

- To list/start/finish/delete release branches, use:

```shell
git flow release
git flow release start <release> [<base>]
git flow release finish <release>
git flow release delete <release>
```

```shell
git flow hotfix
git flow hotfix start <release> [<base>]
git flow hotfix finish <release>
git flow hotfix delete <release>
```

For hotfix branches, the `<base>` arg must be a branch, when omitted it defaults to the production branch.

```shell
$ git flow init
Initialized empty Git repository in /Users/tobi/acme-website/.git/
Branch name for production releases: [master]
Branch name for "next release" development: [develop]
How to name your supporting branch prefixes?
Feature branches? [feature/]
Release branches? [release/]
Hotfix branches? [hotfix/]
```

## git-flow (AVH Edition)

### git flow usage

#### Initialization

To initialize a new repo with the basic branch structure, use:

```shell
git flow init [-arg]
```

This will then interactively prompt you with some questions on which branches you would like to use as development and production branches, and how you would like your prefixes be named. You may simply press Return on any of those questions to accept the `(sane)` default suggestions.

The `-d` flag will accept all defaults.

![示例](https://camo.githubusercontent.com/0eb2574af15662d2fb67be4cce16a3c7c62eda98aaa3b4954be7f6b6f7c3f135/687474703a2f2f692e696d6775722e636f6d2f6c4651625935562e676966)

#### Creating feature/release/hotfix/support branches

- To list/start/finish/delete feature branches, use:

  ```shell
  git flow feature
  git flow feature start <name> [<base>]
  git flow feature finish <name>
  git flow feature delete <name>
  ```

For feature branches, the `<base>` arg must be a branch, when omitted it defaults to the develop branch.

- To push/pull a feature branch to the remote repository, use:

  ```shell
  git flow feature publish <name>
  git flow feature track <name>
  ```

- To list/start/finish/delete release branches, use:

  ```shell
  git flow release
  git flow release start <release> [<base>]
  git flow release finish <release>
  git flow release delete <release>
  ```

For release branches, the `<base>` arg must be a branch, when omitted it defaults to the develop branch.

- To list/start/finish/delete hotfix branches, use:

  ```shell
  git flow hotfix
  git flow hotfix start <release> [<base>]
  git flow hotfix finish <release>
  git flow hotfix delete <release>
  ```

For hotfix branches, the `<base>` arg must be a branch, when omitted it defaults to the production branch.

- To list/start support branches, use:

```shell
git flow support
git flow support start <release> <base>
```

For support branches, the `<base>` arg must be a branch, when omitted it defaults to the production branch.

#### Share features with others

You can easily publish a feature you are working on. The reason can be to allow other programmers to work on it or to access it from another machine. The publish/track feature of gitflow simplify the creation of a remote branch and its tracking.

When you want to publish a feature just use:

```shell
git flow feature publish <name>
```

or, if you already are into the feature/`<name>` branch, just issue:

```shell
git flow feature publish
```

Now if you execute `git branch -avv` you will see that your branch `feature/<name>` tracks `[origin/feature/<name>]`. To track the same remote branch in another clone of the same repository use:

```shell
git flow feature track <name>
```

This will create a local feature `feature/<name>` that tracks the same remote branch as the original one, that is `origin/feature/<name>`.

When one developer `(depending on your work flow)` finishes working on the feature he or she can issue git flow feature finish `<name>` and this will automatically delete the remote branch. All other developers shall then run:

```shell
git flow feature delete <name>
```

to get rid of the local feature that tracks a remote branch that no more exist.

#### Share hotfixes with others

You can publish an hotfix you are working on. The reason can be to allow other programmers to work on it or validate it or to access it from another machine.

When you want to publish an hotfix just use `(as you did for features)`:

```shell
git flow hotfix publish <name>
```

or, if you already are into the `hotfix/<name>`branch, just issue:

```shell
git flow hotfix publish
```

Other developers can now update their repositories and checkout the hotfix:

```shell
git pull
git checkout hotfix/<name>
```

and eventually finish it:

```shell
git flow hotfix finish
```

#### Using Hooks and Filters

For a wide variety of commands hooks or filters can be called before and after the command.
The files should be placed in .git/hooks
In the directory hooks you can find examples of all the hooks available.