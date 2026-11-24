import glob, os, re
for p in sorted(glob.glob('src/**/*', recursive=True) + glob.glob('*.md')):
    if not os.path.isfile(p): continue
    try: s=open(p,encoding='utf-8').read()
    except Exception: continue
    if re.search(r'supabase|lead|suscriptor|mailer|SMTP|resend', s, re.I):
        print('===', p, '===')
        for n,l in enumerate(s.split('\n'),1):
            if re.search(r'supabase|from\(|insert|lead|SMTP|MAIL|email|subject|table', l, re.I):
                print(f'{n}: {l.encode("ascii","replace").decode("ascii").strip()[:170]}')
