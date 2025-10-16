# Setup

```
npx nx g @nx/angular:setup-mf mfeui --mfType=host --port=4200

// new mfe
npx nx g @nx/angular:host dashboard --remotes=products,cart --port=4200
```

## Remote mfe

```
npx nx g @nx/angular:remote products --host=mfeui --port=4201 --style=scss

sudo npx nx g @nx/angular:remote cart --host=mfeui --port=4202 --style=scss
```
