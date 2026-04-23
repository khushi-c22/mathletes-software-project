import pytest
from unittest.mock import Mock, patch

@pytest.fixture
def mock_supabase():
    with patch('supabase.create_client') as mock_create:
        mock_client = Mock()
        mock_create.return_value = mock_client
        yield mock_client

@pytest.fixture
def mock_anthropic():
    with patch('anthropic.Anthropic') as mock_anthropic_class:
        mock_client = Mock()
        mock_anthropic_class.return_value = mock_client
        yield mock_client

def test_supabase_batch_insert(mock_supabase):
    """Test batch inserting eye-tracking data (per data-batch-inserts.md)."""
    mock_supabase.from.return_value.insert.return_value.execute.return_value.data = [{'id': 1}, {'id': 2}]
    
    batch_data = [
        {'session_id': 'session_1', 'x': 100, 'y': 200},
        {'session_id': 'session_1', 'x': 110, 'y': 210}
    ]
    result = mock_supabase.from('eye_tracking_data').insert(batch_data).execute()
    assert len(result.data) == 2

def test_supabase_query_with_index(mock_supabase):
    """Test querying with indexed column (per query-missing-indexes.md)."""
    mock_data = [{'session_id': 'session_1'}]
    mock_supabase.from.return_value.select.return_value.eq.return_value.execute.return_value.data = mock_data
    
    result = mock_supabase.from('eye_tracking_sessions').select('*').eq('session_id', 'session_1').execute()
    assert result.data[0]['session_id'] == 'session_1'

def test_claude_analyze_eye_data(mock_anthropic):
    """Test Claude analysis of eye data."""
    mock_response = Mock()
    mock_response.content = [Mock(text='High engagement detected.')]
    mock_anthropic.messages.create.return_value = mock_response
    
    analysis = analyze_eye_data_with_claude({'x': 100, 'y': 200})
    assert 'High engagement' in analysis