# eCommerceProject
## git
### git commands
* Common git commands:
```ps1
git branch
git checkout -b <branch_name>
git fetch origin
git merge origin/main
git add .
git commit -m "commit_message"
git push -u origin <branch_name>
git restore .
```
### git aliases via powershell:

* local script yürütmeye izin vermek için powershell terminali açıp komutu yürüt `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
*  `notepad $PROFILE` ile editle, `. $PROFILE` ile refresh'le
    * `$PROFILE` yoksa `New-Item -ItemType File -Path $PROFILE -Force` yürüt
* aşağıdaki içeriği `$PROFILE`'a kopyala ve kaydet:
```ps1
function git-copy-main{
git fetch origin
git merge origin/main
}

function git-add-commit{
param([string]$commitMessage)
git add .
git commit -m $commitMessage
}

function git-push-to-branch {
param([string]$branchName)
git push -u origin $branchName
}

function git-restore {
git restore .
}

function git-help{
echo "git-copy-main : "
echo "    git fetch origin"
echo "    git merge origin/main"
echo ""

echo "git-add-commit <commit_message> : "
echo "    git add ."
echo "    git commit -m `"commit_message`""
echo ""

echo "git-push-to-branch <branch_name> : "
echo "    git push -u origin `"branch`""
echo ""

echo "git-restore :  "
echo "    git restore ."
echo ""
}
```

* `git-help` ile komut listesini ve komutların hangi git komutlarını yürüttüğünü gör

* bu aliasları kullanarak normal geliştirme döngüsü:
```h
// powershell terminali aç (VSCode'da default olarak powershell terminali açılıyor, CTRL+SHIFT+P -> "Terminal: Create New Terminal)
git branch   // branch listesini göster, kendi branch'inde olduğundan emin ol, değilsen `git checkout <branch_name"> ile branch'ine geç
git-copy-main  // güncel main branchini dosyaya kopyala
loop:
    git-add-commit "commit_message"
    git-push-to-branch <branch_name>
// githubda branch sayfana git
// create pull request -> merge pull request
```