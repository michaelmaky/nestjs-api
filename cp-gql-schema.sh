files=`find src -type f -name "*.gql"`;
dist='dist';
for file in $files; do
  destDirName=`dirname ${file/$dist}`;
  mkdir -p $destDirName
  cp $file ${file/src/$dist};
done;