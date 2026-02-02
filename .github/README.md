# GitHub Actions Workflows

This directory contains the CI/CD workflows for the StopDiabète project.

## 📁 Structure

```
.github/
├── workflows/
│   ├── ci.yml              # Main CI pipeline (tests, lint, build)
│   ├── deploy.yml          # Production deployment to Hostinger
│   └── pr-checks.yml       # Pull request validation
├── hooks/
│   └── pre-commit          # Pre-commit validation hook
├── environments/
│   └── frontend.env.template  # Environment variables template
├── CI_CD_GUIDE.md          # Complete CI/CD documentation
└── setup-secrets.sh        # Script to guide secrets configuration
```

## 🚀 Quick Start

### 1. Configure GitHub Secrets

```bash
# View secrets configuration guide
./.github/setup-secrets.sh
```

Then configure the secrets in:
`Repository → Settings → Secrets and variables → Actions`

### 2. Install Git Hooks (Optional)

```bash
# Install pre-commit hooks for local validation
./install-hooks.sh
```

### 3. Push to GitHub

```bash
git push origin main
```

The CI/CD pipeline will run automatically!

## 📋 Workflows Overview

### 🔄 CI Pipeline (`ci.yml`)

**Triggers:** Push/PR to `main` or `develop`

**Jobs:**
- Backend tests with PostgreSQL
- Frontend tests and build
- Security audit
- Upload build artifacts

**Duration:** ~3-5 minutes

### 🚀 Deploy (`deploy.yml`)

**Triggers:** Push to `main` or manual trigger

**Jobs:**
- Build frontend and backend
- Deploy frontend via FTP
- Deploy backend via SSH
- Run database migrations
- Restart services with PM2

**Duration:** ~5-10 minutes

### ✅ PR Checks (`pr-checks.yml`)

**Triggers:** Pull request opened/updated

**Jobs:**
- Validate PR title (conventional commits)
- Check for TODO/FIXME/console.log
- Check file sizes
- Full test suite
- Build size report

**Duration:** ~4-6 minutes

## 🔐 Required Secrets

| Secret | Description |
|--------|-------------|
| `PRODUCTION_API_URL` | Production API URL |
| `FTP_SERVER` | Hostinger FTP server |
| `FTP_USERNAME` | FTP username |
| `FTP_PASSWORD` | FTP password |
| `SSH_HOST` | SSH host |
| `SSH_USERNAME` | SSH username |
| `SSH_PASSWORD` | SSH password |
| `PROD_JWT_SECRET` | Production JWT secret |

See `setup-secrets.sh` for complete list and configuration guide.

## 📊 Monitoring

### View Workflow Runs

1. Go to repository **Actions** tab
2. Select a workflow
3. View logs and results

### Build Artifacts

Frontend builds are saved for 7 days:
- Navigate to a workflow run
- Download from **Artifacts** section

## 🛠️ Customization

### Modify CI Pipeline

Edit `.github/workflows/ci.yml`:

```yaml
jobs:
  my-custom-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: My custom step
        run: echo "Custom command"
```

### Add Notifications

Add Slack/Discord notifications:

```yaml
- name: Notify
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Change Node Version

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change version here
```

## 🐛 Troubleshooting

### Workflow Fails

1. Check logs in Actions tab
2. Verify secrets are configured
3. Test locally first
4. Check YAML syntax

### Deployment Fails

1. Verify FTP/SSH credentials
2. Check server paths
3. Ensure services are running
4. Review server logs

### Tests Fail

```bash
# Test locally first
npm test

# Check if test script exists
cat package.json | grep test
```

## 📚 Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Complete CI/CD Guide](./CI_CD_GUIDE.md)
- [Deployment Guide](../DEPLOYMENT.md)

## 💡 Tips

- Use `workflow_dispatch` for manual triggers
- Add `continue-on-error: true` for optional steps
- Cache `node_modules` to speed up builds
- Use matrix strategy for multiple Node versions
- Enable branch protection rules

---

**Need Help?** Check [CI_CD_GUIDE.md](./CI_CD_GUIDE.md) for detailed documentation.
