HOST=$1
PORT=$2
shift 2

echo "Esperando por $HOST:$PORT..."

while ! nc -z $HOST $PORT; do
  sleep 1
done

echo "$HOST:$PORT está pronto - executando comando"
exec "$@"