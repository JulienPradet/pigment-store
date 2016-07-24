git commit -am "Version $1"

git push origin master

git tag $1
git tag latest -f

git push origin $1
git push origin latest -f
