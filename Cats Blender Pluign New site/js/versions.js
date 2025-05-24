let versions = [];

function isDownloadPage() {
    return document.getElementById('blender-version-select') !== null;
}

async function loadVersions() {
    try {
        const response = await fetch('data/versions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        versions = data.versions;
        
        if (isDownloadPage()) {
            initVersionSelector();
        }
    } catch (error) {
        console.error('Error loading versions data:', error);
        const versionSelect = document.getElementById('blender-version-select');
        if (versionSelect) {
            versionSelect.innerHTML = '<option value="" disabled selected>Error loading versions data</option>';
            document.getElementById('version-description').textContent = 
                'Sorry, we encountered an error loading the version data. Please try refreshing the page or contact support if the problem persists.';
        }
    }
}

function initVersionSelector() {
    const versionSelect = document.getElementById('blender-version-select');
    const versionTitle = document.getElementById('selected-version-title');
    const blenderBadge = document.getElementById('blender-badge');
    const catsBadge = document.getElementById('cats-badge');
    const statusBadge = document.getElementById('status-badge');
    const versionDescription = document.getElementById('version-description');
    const versionWarning = document.getElementById('version-warning');
    const supportLinks = document.getElementById('support-links');
    const supportLinksContainer = document.getElementById('support-links-container');
    const downloadButton = document.getElementById('download-button');
    const downloadNote = document.getElementById('download-note');
    
    versionSelect.innerHTML = '<option value="" selected disabled>Choose your Blender version</option>';
    
    const blenderGroups = {};
    
    versions.forEach(version => {
        if (!blenderGroups[version.blenderVersions]) {
            blenderGroups[version.blenderVersions] = [];
        }
        blenderGroups[version.blenderVersions].push(version);
    });
    
    Object.keys(blenderGroups).forEach(blenderVersion => {
        const option = document.createElement('option');
        option.value = blenderGroups[blenderVersion][0].id;
        option.textContent = `Blender ${blenderVersion}`;
        
        if (blenderGroups[blenderVersion].length > 1) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = `Blender ${blenderVersion}`;
            
            blenderGroups[blenderVersion].forEach(version => {
                const subOption = document.createElement('option');
                subOption.value = version.id;
                subOption.textContent = `${version.name} (${version.status})`;
                optgroup.appendChild(subOption);
            });
            
            versionSelect.appendChild(optgroup);
        } else {
            versionSelect.appendChild(option);
        }
    });
    
    versionSelect.addEventListener('change', function() {
        const selectedVersionId = this.value;
        const selectedVersion = versions.find(v => v.id === selectedVersionId);
        
        if (selectedVersion) {
            versionTitle.textContent = selectedVersion.name;
            blenderBadge.textContent = `Blender: ${selectedVersion.blenderVersions}`;
            
            catsBadge.textContent = `Version: ${selectedVersion.name.replace('Cats Blender Plugin ', '')}`;
            catsBadge.classList.remove('hidden');
            
            statusBadge.textContent = `Status: ${selectedVersion.status.charAt(0).toUpperCase() + selectedVersion.status.slice(1)}`;
            statusBadge.className = 'badge badge-status';
            statusBadge.classList.add(selectedVersion.status);
            
            versionDescription.textContent = selectedVersion.description;
            
            if (selectedVersion.warning) {
                versionWarning.textContent = selectedVersion.warning;
                versionWarning.classList.remove('hidden');
            } else {
                versionWarning.classList.add('hidden');
            }
            
            if (selectedVersion.supportLinks && selectedVersion.supportLinks.length > 0) {
                supportLinksContainer.innerHTML = '';
                selectedVersion.supportLinks.forEach(link => {
                    const a = document.createElement('a');
                    a.href = link.url;
                    a.className = 'support-link';
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    
                    const icon = document.createElement('span');
                    icon.className = 'icon';
                    icon.textContent = link.icon || '🔗';
                    
                    const name = document.createElement('span');
                    name.className = 'name';
                    name.textContent = link.name;
                    
                    a.appendChild(icon);
                    a.appendChild(name);
                    supportLinksContainer.appendChild(a);
                });
                supportLinks.classList.remove('hidden');
            } else {
                supportLinks.classList.add('hidden');
            }
            
            downloadButton.href = selectedVersion.downloadUrl;
            downloadButton.textContent = `Get ${selectedVersion.name}`;
            downloadButton.classList.remove('disabled');
            downloadButton.setAttribute('data-external', 'true');
                        
            if (selectedVersion.downloadUrl.includes('github.com')) {
                downloadNote.textContent = "Click the button above to go to the GitHub release page where you can download the plugin.";
                downloadNote.classList.remove('hidden');
                downloadButton.textContent = `View GitHub Release`;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', loadVersions);
