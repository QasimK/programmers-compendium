# Kubernetes

## Commands

### Running as a different user

Work around for K8S not supporting --user flag: https://github.com/kubernetes/kubernetes/issues/30656

```
kubectl get pods
kubectl describe pod <POD-NAME>
gcloud compute ssh "<NODE-NAME>"
docker ps
docker exec -it --user root <ID> /bin/bash
```



